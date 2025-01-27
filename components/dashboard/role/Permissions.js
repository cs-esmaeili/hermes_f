import translation from "@/translation/translation";
import useTogglePermission from "@/hooks/role/useTogglePermission";

export default function Permissions({ allPermissions, currentRole, setUpdateList }) {

    const { permissions } = translation.getMultiple(['someThingIsWrong', 'permissions']);
    const { togglePermissionRequest } = useTogglePermission(setUpdateList);


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
                            onClick={() => togglePermissionRequest(currentRole._id, permission._id)}
                        >
                            <div className="text-pretty flex flex-col  max-w-full  justify-center items-center bg-secondary p-3 rounded-md" style={{ wordBreak: 'break-word' }}>
                                <div>
                                    {permission?.route}
                                </div>
                                <div>
                                    {permission?.disc}
                                </div>
                            </div>
                            <div className=" m-auto"></div>
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
