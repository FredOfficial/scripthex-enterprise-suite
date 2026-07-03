import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const formatStatus = (status) => {
  if (!status) return "";

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatHours = (minutes) => {
  if (!minutes) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} mins`;

  return `${hours}h ${mins}m`;
};

const getPeriodLabel = (dateFilter) => {
  if (dateFilter === "today") return "Today";
  if (dateFilter === "week") return "This Week";
  if (dateFilter === "month") return "This Month";
  return "All Records";
};

export const exportAttendanceExcel = (attendances, dateFilter) => {
  const periodLabel = getPeriodLabel(dateFilter);

  const rows = attendances.map((attendance) => ({
    "Employee No": attendance.employee?.employeeNo ?? "",
    Employee: `${attendance.employee?.firstName ?? ""} ${
      attendance.employee?.lastName ?? ""
    }`.trim(),
    Department: attendance.employee?.department?.name ?? "",
    Date: new Date(attendance.date).toLocaleDateString("en-PH"),
    "Time In": attendance.timeIn
      ? new Date(attendance.timeIn).toLocaleTimeString("en-PH")
      : "",
    "Time Out": attendance.timeOut
      ? new Date(attendance.timeOut).toLocaleTimeString("en-PH")
      : "",
    Late: attendance.lateMinutes ? `${attendance.lateMinutes} mins` : "On Time",
    "Working Hours": formatHours(attendance.workingHours),
    Status: formatStatus(attendance.status),
    Remarks: attendance.remarks ?? "",
  }));

  const worksheet = XLSX.utils.json_to_sheet([]);

  XLSX.utils.sheet_add_aoa(worksheet, [
    ["SCRIPTHEX ENTERPRISE SUITE"],
    ["Attendance Report"],
    [`Report Period: ${periodLabel}`],
    [`Date Generated: ${new Date().toLocaleString("en-PH")}`],
    [],
  ]);

  XLSX.utils.sheet_add_json(worksheet, rows, {
    origin: "A6",
  });

  worksheet["!cols"] = [
    { wch: 16 },
    { wch: 28 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 18 },
    { wch: 14 },
    { wch: 28 },
  ];

  worksheet["!freeze"] = {
    xSplit: 0,
    ySplit: 6,
  };

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Attendance Report - ${periodLabel}.xlsx`);
};
