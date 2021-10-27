import { notification } from "antd";

export const openNotification = (message, description, type = "info") => {
  const args = {
    message: message,
    description: description,
    duration: 3,
    placement: "bottomRight",
  };
  notification[type](args);
};

export const getListParams = () => {
  try {
    const urlSearchParams = new URLSearchParams(
      window.location.search === ""
        ? window.location.href.split("?")[1]
        : window.location.search
    );
    return Object.fromEntries(urlSearchParams.entries());
  } catch (error) {
    console.log(error);
  }
  return [];
};
