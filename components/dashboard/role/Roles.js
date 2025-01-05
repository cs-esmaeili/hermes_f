import { useState, useEffect } from 'react';
import { IoMdTrash } from 'react-icons/io';
import useRoleList from '@/hooks/role/useRoleList'
import useDeleteRole from '@/hooks/role/useDeleteRole'
import { ImCancelCircle } from "react-icons/im";
import Add from './Add';
import translation from "@/translation/translation";
import { useSelector } from 'react-redux';

export default function Roles({ setCurrentRole, setAllpermissions, updateList, selectMode, listener }) {

    const [roles, setRoles] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [deleteMode, setDeleteMode] = useState(-1);
    const roleName = useSelector((state) => state.information.value.role_id.name);
    const { someThingIsWrong, rolesT } = translation.getMultiple(['someThingIsWrong', 'rolesT']);

    const resetAllData = () => {
        if (!selectMode) {
            setCurrentRole(null);
            setAllpermissions(null);
        }
        setRoles(null);
        setCurrentIndex(-1);
        setDeleteMode(-1);
    }
    const { roleListRequest } = useRoleList(setRoles, setAllpermissions, setCurrentRole, selectMode, currentIndex);
    const { deleteRoleRequest } = useDeleteRole(resetAllData, roleListRequest);


    useEffect(() => {
        roleListRequest(true);
    }, [updateList]);

    const toggleButtons = (index) => {
        if (deleteMode != -1 && index == deleteMode) {
            return (<ImCancelCircle className='text-white' onClick={() => {
                setDeleteMode(-1);
            }} />)
        }
        if (deleteMode == -1) {
            return (
                <div className='bg-secondary rounded-full p-2'>
                    <IoMdTrash className='text-red-400' onClick={() => {
                        setDeleteMode(index);
                    }} />
                </div>
            )
        }
    }
    return (
        <div className='flex flex-col grow'>
            <div className='flex w-full justify-center p-2'>
                <div>{rolesT.roleListTitle}</div>
            </div>
            <div className='flex flex-col pr-3 pl-3 w-full gap-2'>
                {(roles != null) &&
                    roles.map((role, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-2 rounded-md bg-primary hover:bg-opacity-50
                               ${(index === currentIndex && deleteMode == -1) ? "!bg-accent text-white" : ""} 
                               ${(deleteMode != -1) ? (index === deleteMode) ? "!bg-red-400" : "!bg-green-500" : ""}
                               ${role.name == roleName && "opacity-50 cursor-not-allowed"}
                            `}>
                                <div
                                    className="flex w-full  justify-center items-center"
                                    key={index}
                                    onClick={() => {
                                        if (role.name == roleName) {
                                            return;
                                        }
                                        if (deleteMode == -1) {
                                            setCurrentIndex(index);
                                            if (!selectMode) {
                                                setCurrentRole(roles[index]);
                                            } else {
                                                listener(role);
                                            }
                                        } else if (index != deleteMode) {
                                            deleteRoleRequest(roles[deleteMode]._id, role._id);
                                        }
                                    }}>
                                    {role.name}
                                </div>
                                {toggleButtons(index)}
                            </div>
                        )
                    })}
                {deleteMode == -1 &&
                    <Add resetAllData={resetAllData} roleList={roleListRequest} />
                }
            </div>
        </div>
    )
}
