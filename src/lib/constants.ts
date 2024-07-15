interface PageType {
  backgroundColor: string;
  modal: number[];
}

interface TimeRangeType {
  start: Date;
  end: Date;
  timezone: string;
}

interface ModalType {
  title: string;
  description: string;
  // edge case: timeRange.start & timeRange.end can hold 2 different dates- that's why we need day as a consistent source of truth
  day: Date;
  timeRange: TimeRangeType;
  body: string;
}

const PAGES: Record<string, PageType> = {
  red: {
    backgroundColor: "bg-red-600",
    modal: [1, 3],
  },
  green: {
    backgroundColor: "bg-green-600",
    modal: [1, 2],
  },
  blue: {
    backgroundColor: "bg-blue-600",
    modal: [2, 3],
  },
};

const MODALS: Record<number, ModalType> = {
  1: {
    title: "Modal 1",
    description: "Lorem Ipsum is simply",
    day: new Date("2024-06-22"),
    timeRange: {
      start: new Date("2024-06-22T18:00:00"),
      end: new Date("2024-06-22T19:30:00"),
      timezone: "EST",
    },
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
  },
  2: {
    title: "Modal 2",
    description: "Lorem Ipsum is fun",
    day: new Date("2023-06-04"),
    timeRange: {
      start: new Date("2023-06-04T21:00:00"),
      end: new Date("2023-06-04T21:30:00"),
      timezone: "PST",
    },
    body: "Lorem Ipsum is simply dummy cillum dolore eu fugiat nulla pariatur. cillum dolore eu fugiat nulla pariatur.",
  },
  3: {
    title: "Modal 3",
    description: "Lorem Ipsum is wack",
    day: new Date("2023-06-21"),
    timeRange: {
      start: new Date("2023-06-21T19:00:00"),
      end: new Date("2023-06-21T19:30:00"),
      timezone: "EST",
    },
    body: "Lorem Ipsum qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
  },
};

export { PAGES, MODALS };
export type { ModalType, TimeRangeType, PageType };
