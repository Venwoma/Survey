import { message as antdMessage } from "antd";
import { commonStore } from "../../store";
export default function Message() {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const set = commonStore.useSet();
  set(() => ({ messageApi: messageApi }));
  return contextHolder;
}
