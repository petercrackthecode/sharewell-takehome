import { cn } from "@/lib/utils";
import { type ModalType, TimeRangeType } from "@/lib/constants";
import { useWindowWidth } from "@react-hook/window-size";
import sharewellLogo from "@/assets/logo.png";

function format12HourTime(date: Date) {
  let hours: number = date.getHours();
  let minutes: number = date.getMinutes();

  let period = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  // convert hours from the 24hrs to the 12hrs format
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format hours to always be two digits
  let hourStr: string = hours < 10 ? "0" + hours : `${hours}`;
  // Format minutes to always be two digits
  let minuteStr: string = minutes < 10 ? "0" + minutes : `${minutes}`;

  return `${hourStr}:${minuteStr}${period}`;
}

const parseDate = (date: Date): string => {
  const fmtOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", fmtOptions).format(date);
};

const parseTimeRange = (timeRange: TimeRangeType): string => {
  // TODO
  let startTimeStr: string = format12HourTime(timeRange.start),
    endTimeStr: string = format12HourTime(timeRange.end);
  return `${startTimeStr} - ${endTimeStr} ${timeRange.timezone}`;
};

export default function Modal({
  closeModal,
  modalContent,
}: {
  isOpen: boolean;
  closeModal: () => void;
  modalContent: ModalType;
}) {
  const width = useWindowWidth();

  if (!modalContent) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute top-0 h-screen left-0 right-0 z-50 bg-[#f8fafc66] flex flex-row items-center justify-center p-5"
      )}
      onClick={closeModal}
    >
      <div
        className={cn(
          "flex flex-col justify-between rounded-lg opacity-100",
          `2xl:w-[${width * 0.7}px] 2xl:h-[${width * 0.5}px]`,
          `xl:w-[${width * 0.7}px] xl:h-[${width * 0.5}px]`,
          `lg:w-[${width * 0.9}px] lg:h-[${width * 0.5}px]`,
          `md:w-[800px] md:h-5/6`,
          `sm:w-[400px] sm:h-5/6`
        )}
        style={{
          backgroundColor: "white",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header flex flex-row justify-between h-1/2 bg-[#687CEB] border-0 rounded-t-lg bg-logo bg-right-bottom bg-no-repeat overflow-x-hidden">
          <div className="p-5 h-full text-white flex flex-col justify-evenly">
            <h1 className="text-4xl font-medium">{modalContent.title}</h1>
            <p>{modalContent.description}</p>
            <div className="modal-header-timestamp">
              <p className="text-lg">{parseDate(modalContent.day)}</p>
              <p className="text-lg">{parseTimeRange(modalContent.timeRange)}</p>
            </div>
          </div>
          <img src={sharewellLogo.src} alt="share-well logo" className="w-auto h-auto" />
          {/* <div className="h-full w-1/2" style={{ backgroundImage: `url(${sharewellLogo.src})` }} /> */}
        </div>
        <div className="modal-body h-1/4 flex flex-col gap-2 p-5 border-b border-b-slate-200 text-black">
          <div className="modal-body-header flex justify-between">
            <div>
              <p>Lorem Ipsum</p>
              <p className="font-bold">Lorem Ipsum</p>
            </div>
            <button className="hover:scale-125 duration-200 text-2xl" onClick={() => closeModal()}>
              X
            </button>
          </div>
          <p className="overflow-auto">{modalContent.body}</p>
        </div>
        <div className="modal-footer h-1/4 p-5 flex flex-col gap-2">
          <p className="w-full text-black text-center">Lorem Ipsum is simply dummy text.</p>
          <button
            className="w-full rounded-full p-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-gray-400"
            disabled
          >
            LOREM IPSUM
          </button>
        </div>
      </div>
    </div>
  );
}
