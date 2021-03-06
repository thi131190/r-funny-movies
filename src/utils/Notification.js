import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default function getIdFromUrl(
  title = "Info",
  message = "Change me!",
  type = "default"
) {
  store.addNotification({
    title: title,
    message: message,
    type: type, // 'default', 'success', 'warning', 'danger'
    container: "top-right", // where to position the notifications
    animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
    width: 400,
    dismiss: {
      duration: 3000
    }
  });
}
