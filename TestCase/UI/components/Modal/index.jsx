import React, { useState } from "react";
import { Modal } from "antd";

const ModalApp = ({ isOpen, title, content, onClose }) => {
  return (
    <Modal
      footer=""
      title={title}
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
    >
      {content}
    </Modal>
  );
};
export default ModalApp;
