import React from "react";
import { Collapse } from "antd";
import IdentityCard from "../components/IdentityCard";
import IdentityInfo from "../components/IdentityInfo";
import PortraitLiveness from "../components/PortraitLiveness";
import RiskManagement from "../components/RiskManagement";
import ProcessHistory from "../components/ProcessHistory";
import IdentityProcess from "../components/IdentityProcess";
import { getListParams } from "../Utils";

function EkycDetailView({ camundaAPI }) {
  const { Panel } = Collapse;
  const taskId = getListParams()["taskid"];
  
  return taskId ? (
    <div className="container">
      <Collapse defaultActiveKey={["6"]}>
        <Panel header="Thông tin CMND/CCCD/Hộ Chiếu" key="1">
          <IdentityCard />
        </Panel>
        <Panel header="Thông tin cá nhân" key="2">
          <IdentityInfo />
        </Panel>
        <Panel header="Thông tin ảnh chân dung và Liveness" key="3">
          <PortraitLiveness />
        </Panel>
        <Panel header="Quản lý rủi ro" key="4">
          <RiskManagement />
        </Panel>
        <Panel header="Lịch sử xử lý" key="5">
          <ProcessHistory />
        </Panel>
        <Panel header="Xử lý định danh" key="6">
          <IdentityProcess camundaAPI={camundaAPI} taskId={taskId} />
        </Panel>
      </Collapse>
    </div>
  ) : (
    <div>Nothing to show!</div>
  );
}

export default EkycDetailView;
