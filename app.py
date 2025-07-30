from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pytz import timezone
from datetime import datetime
import os
import re
import csv

IST = timezone('Asia/Kolkata')

app = Flask(__name__)
CORS(app)

# ✅ Google Sheet Setup
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Audit Tracker").sheet1  # Change this to your actual sheet name

HEADERS = [
    "ticket_id", "ticket_name", "BLI", "request_assigned_date", "request_due_date",
    "developer_name", "urls_list", "no_of_urls", "audit_type",
    "auditor_name", "audit_assigned_date", "audit_assigned_time",
    "audit_comments", "audit_status", "audit_completion_date", "audit_completion_time"
]

# Ensure headers
if sheet.row_count == 0 or sheet.row_values(1) != HEADERS:
    sheet.clear()
    sheet.append_row(HEADERS)

@app.route('/submit_ticket', methods=['POST'])
def submit_ticket():
    data = request.json
    now = datetime.now(IST)
    audit_date = now.strftime("%Y-%m-%d")
    audit_time = now.strftime("%H:%M:%S")

    ticket_id = data.get("ticket_id")
    all_data = sheet.get_all_records()

    for row in all_data:
        if row["ticket_id"] == ticket_id and row["audit_assigned_time"] == audit_time:
            return jsonify({"message": "Ticket ID already exists with same audit time"}), 400

    raw_urls = data.get("urls_list", "")
    normalized = re.sub(r'(https?://)', r' \1', raw_urls).strip()
    url_parts = re.split(r'[,\s]+', normalized)
    valid_urls = [url for url in url_parts if re.match(r'^https?://', url)]
    formatted_urls = ", ".join(valid_urls)

    new_row = [
        data.get("ticket_id"), data.get("ticket_name"), data.get("BLI"),
        data.get("request_assigned_date"), data.get("request_due_date"),
        data.get("developer_name"), formatted_urls, data.get("no_of_urls"),
        data.get("audit_type"), data.get("auditor_name"), audit_date, audit_time,
        "", "", "", ""
    ]

    sheet.append_row(new_row)
    return jsonify({"message": "Ticket submitted successfully"})

@app.route('/search_ticket', methods=['GET'])
def search_ticket():
    ticket_id = request.args.get("ticket_id")
    all_data = sheet.get_all_records()
    results = []

    for i, row in enumerate(all_data, start=2):
        if str(row["ticket_id"]) == ticket_id and any(not row[key] for key in ["audit_comments", "audit_status", "audit_completion_date", "audit_completion_time"]):
            row["Row Number"] = i
            results.append(row)

    return jsonify(results) if results else jsonify({"message": "No incomplete records found for Ticket ID"}), 404

@app.route('/search_ticket_all', methods=['GET'])
def search_ticket_all():
    ticket_id = request.args.get("ticket_id")
    all_data = sheet.get_all_records()
    results = []

    for i, row in enumerate(all_data, start=2):
        if str(row["ticket_id"]) == ticket_id:
            row["Row Number"] = i
            results.append(row)

    return jsonify(results) if results else jsonify({"message": "No records found for Ticket ID"}), 404

@app.route('/search_row', methods=['GET'])
def search_row():
    row_number = int(request.args.get("row_number"))
    if row_number < 2 or row_number > sheet.row_count:
        return jsonify({"message": "Row not found"}), 404

    row = sheet.row_values(row_number)
    row += [""] * (len(HEADERS) - len(row))
    data = dict(zip(HEADERS, row))
    data["Row Number"] = row_number
    return jsonify(data)

@app.route('/add_audit', methods=['POST'])
def add_audit():
    data = request.json
    row_number = int(data.get("row_number"))
    now = datetime.now(IST)

    if row_number < 2 or row_number > sheet.row_count:
        return jsonify({"message": "Invalid row number"}), 404

    sheet.update_cell(row_number, 13, data.get("audit_comments"))      # audit_comments
    sheet.update_cell(row_number, 14, data.get("audit_status"))        # audit_status
    sheet.update_cell(row_number, 15, now.strftime("%Y-%m-%d"))        # audit_completion_date
    sheet.update_cell(row_number, 16, now.strftime("%H:%M:%S"))        # audit_completion_time

    return jsonify({"message": f"Audit data updated successfully for row number {row_number}"})

@app.route('/download_report', methods=['GET'])
def download_report():
    filename = "report.csv"
    all_data = sheet.get_all_records()

    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS)
        writer.writeheader()
        for row in all_data:
            writer.writerow(row)

    return send_file(filename, as_attachment=True)

@app.route('/')
def home():
    return '✅ Audit Tracking Tool is Live! Use /submit_ticket or other endpoints.'

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
