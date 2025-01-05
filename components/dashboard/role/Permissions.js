import { togglePermission as RtogglePermission } from '@/services/Permission';
import toast from 'react-hot-toast';
import translation from "@/translation/translation";

export default function Permissions({ allPermissions, currentRole, setUpdateList }) {
    
    const { someThingIsWrong, permissions } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const togglePermission = async (role_id, permission_id) => {
        try {
            const { data } = await RtogglePermission({ role_id, permission_id });
            const { message } = data;
            toast.success(message);
            setUpdateList();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || someThingIsWrong);
        }
    };

    return (
        <>
            {(allPermissions && currentRole) ? (
                allPermissions.map((permission, index) => {
                    let active = false;
                    const { permissions } = currentRole;
                    for (let i = 0; i < permissions.length; i++) {
                        if (allPermissions[index]._id === permissions[i]._id) {
                            active = true;
                            break;
                        }
                    }

                    return (
                        <div
                            className="flex grow justify-center items-center p-5 bg-primary rounded-lg max-w-full"
                            key={index}
                            onClick={() => togglePermission(currentRole._id, permission._id)}
                        >
                            <div className="text-pretty flex grow max-w-full" style={{ wordBreak: 'break-word' }}>
                                {permission?.route}
                            </div>

                            <div className={`rounded-full bg-primary w-10 h-10 min-w-10 ${(active && "!bg-accent")}`} />
                        </div>
                    );
                })
            ) : (
                <div className="flex grow justify-center items-center">
                    {permissions.selecRole}
                </div>
            )}
        </>
    );
}
