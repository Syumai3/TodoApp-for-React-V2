export type Todotype = {
  id: number;
  title: string;
  status: StatusType;
};

export type StatusType = "全て" | "未着手" | "進行中" | "完了";
