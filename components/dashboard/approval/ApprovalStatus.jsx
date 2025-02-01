const ApprovalStatus = ({ approval }) => {


    if (approval.status == "pending") {
        return (
            <div className="flex  bg-orange-400 p-3 rounded-md justify-center">
                <div className="flex w-fit items-center">{`در انتظار تایید به دلیل : ${approval.title}`}</div>
            </div>
        );
    } else {
        return (
            <div className="flex  bg-red-400 p-3 rounded-md justify-center">
                <div className="flex w-fit items-center">{`رد شده به دلیل : ${approval.comment}`}</div>
            </div>
        )
    }
};

export default ApprovalStatus;