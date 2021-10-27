import React from "react";
import { EyeOutlined } from "@ant-design/icons";

export const TableColumns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Thao tác",
    render: (text, row) =>
      row["TaskID"] ? (
        <div style={{ alignItems: "center" }}>
          <a href={`#/contract-detail?taskid=${row["TaskID"]}`}>
            <EyeOutlined style={{ fontSize: 20 }} />
          </a>
        </div>
      ) : (
        <div />
      ),
    align: "center",
  },
  {
    title: "Số CIF",
    dataIndex: "CIFNo",
    key: "CIFNo",
  },
  {
    title: "Loại KH",
    dataIndex: "CustKind",
    key: "CustKind",
  },
  {
    title: "Tên KH",
    dataIndex: "FullName",
    key: "FullName",
  },
  {
    title: "Ngày sinh",
    dataIndex: "DOB",
    key: "DOB",
  },
  {
    title: "MobileNo",
    dataIndex: "MobileNo",
    key: "MobileNo",
  },
  {
    title: "CMT/CCCD/Hộ Chiếu",
    dataIndex: "IDNo",
    key: "IDNo",
  },
  {
    title: "Ngày định danh",
    dataIndex: "CreateDate",
    key: "CreateDate",
  },
  {
    title: "Điểm",
    dataIndex: "Score",
    key: "Score",
  },
  {
    title: "Đối tác",
    dataIndex: "MerchantID",
    key: "MerchantID",
  },
];

export const StatusList = {
  chuaxuly: "Chưa xử lý",
  qlrrdangxuly: "QLRR đang xử lý",
  qlrrdongy: "QLRR đồng ý",
  qlhsdangxyly: "QLHS đang xử lý",
  choduyet: "Chờ duyệt",
  guicrmthatbai: "Gửi CRM thất bại",
  chocrmphanhoi: "Chờ CRM phản hồi",
  dacocif: "Đã có CIF",
  thatbai: "Thất bại/Từ chối",
  ekyctimeout: "eKYC timeout",
};

export const IdentifyScore = {
  "": "Tất cả",
  lessthan75: "Nhỏ hơn 75",
  from75to90: "Từ 75 đến 90",
  greaterthan90: "Lớn hơn 90",
};

export const Partner = {
  tiki: "TIKI",
  momo: "MOMO",
  zalo: "ZALO",
};

export const RiskManagement = {
  "": "Tất cả",
  trungip: "Trùng IP",
  trungthietbi: "Trùng thiết bị",
  trungdt: "Trùng SĐT",
};

export const CustomerType = {
  "": "Tất cả",
  chuan: "Chuẩn",
  vanglai: "Vãng lai",
  chuaxacdinh: "Chưa xác định",
  chuaxacdinh300: "Chưa xác định -300",
  chuaxacdinh102: "Chưa xác định -102",
};

export const DefaultFormValue = {
  UserID: "",
  BranchCode: "",
  FromDate: "",
  ToDate: "",
  IDNo: "",
  FullName: "",
  MobileNo: "",
  CustKind: "",
  Score: "",
  IP: "",
  RiskKind: "",
  UserProcess: "",
  Status: "",
  MerchantID: "",
};

export const SampleDataSource = [
  {
    ID: "1",
    CIFNo: "",
    CustKind: "Chưa xác định",
    FullName: "Lê Thị Thanh Tâm",
    MobileNo: "0909090909",
    IDNo: "123456789",
    CreateDate: "2021-10-20",
    Score: "99",
    FailureCount: "0",
    IPDuplicatedCount: "0",
    UserProcess: "datnq29692",
    UserApprove: "datnq29692",
    MerchantID: "TIKI",
    Status: "U",
  },
  {
    ID: "2",
    CIFNo: "",
    CustKind: "Chưa xác định",
    FullName: "Nguyễn Văn Tuấn",
    MobileNo: "0909090909",
    IDNo: "123456789",
    CreateDate: "2021-10-20",
    Score: "99",
    FailureCount: "0",
    IPDuplicatedCount: "0",
    UserProcess: "datnq29692",
    UserApprove: "datnq29692",
    MerchantID: "TIKI",
    Status: "U",
  },
];
