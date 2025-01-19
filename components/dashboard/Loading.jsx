import React from 'react';

const Loading = ({ size = "w-10 h-10", color = "border-gray-200", loading = false }) => {
    if (loading) {
        return (
            <div className={`relative ${size} ${color}`}>
                <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
            </div>
        );
    } else {
        return null;
    }
};

export default Loading;