import CustomImage from "../CustomImage";
import { getCookie } from 'cookies-next';
import VideoJS from "@/components/dashboard/videoPlayer";
import Icon from "@/components/general/Icon";

const FileDetails = ({ file }) => {

    const token = decodeURIComponent(getCookie('token'));
    const { originalName, hostName, mimeType, size, isPrivate } = file;

    const fileUrl = `${process.env.NEXT_PUBLIC_API}file/${file._id}/${decodeURIComponent(token)}`;
    console.log(fileUrl);

    return (
        <div className="flex gap-3 flex-col-reverse lg:min-w-[50rem]  md:flex-row h-full sm:min-w-[30rem] xl:min-w-[70rem]  xl:max-w-[70rem] overflow-x-hidden">

            <div className="lg:w-1/4 flex flex-col bg-secondary rounded-lg p-3">
                <div>originalName : {originalName}</div>
                <div className="flex flex-nowrap">hostName : {hostName}</div>
                <div>mimeType : {mimeType}</div>
                <div>size : {size}</div>
                <div>isPrivate : {isPrivate + ""}</div>
            </div>

            <div className="w-screen h-[15rem] lg:w-3/4 sm:h-[20rem]  md:h-[35rem] xl:h-[40rem] relative grid items-center">
                {!mimeType.includes("image") && !mimeType.includes("video") &&
                    <Icon
                        name={"file"}
                        className="w-full h-3/4 text-white"
                    />
                }
                {mimeType.includes("image") &&
                    <CustomImage
                        src={fileUrl}
                        alt="Example Image"
                        fill={true}
                        objectFit="contain"
                    />
                }
                {mimeType.includes("video") &&
                    <div className="relative">
                        <VideoJS
                            options={{
                                autoplay: false,
                                controls: true,
                                responsive: true,
                                fluid: true,
                                sources: [
                                    {
                                        src: fileUrl,
                                        type: "video/mp4",
                                    },
                                ],
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default FileDetails;