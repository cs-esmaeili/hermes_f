import CustomImage from "../CustomImage";
import { getCookie } from 'cookies-next';

const FileDetails = ({ file }) => {

    const token = decodeURIComponent(getCookie('token'));

    return (
        <div className="flex w-full bg-red-400">
            <div className="w-1/4">data</div>
            <div className="w-3/4">
                <CustomImage
                    src={`${process.env.NEXT_PUBLIC_API}file/${file._id}/${decodeURIComponent(token)}`}
                    alt="Example Image"
                    fill={true}
                    objectFit="contain"
                />
            </div>
        </div>
    );
};

export default FileDetails;