'use client';

import QRCode from 'react-qr-code';

const QRCodeComponent = ({ url }) => {
    return (
        <div className="flex justify-center items-center">
            <QRCode value={url} size={256} />
        </div>
    );
};

export default QRCodeComponent;
