export type Todotype = {
  id: number;
  title: string;
  status: StatusType;
};

export type StatusType = "未着手" | "進行中" | "完了";

export type FilterStatusType = "全て" | "未着手" | "進行中" | "完了";
