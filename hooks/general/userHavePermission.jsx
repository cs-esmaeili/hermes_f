import { useSelector } from 'react-redux';

const userHavePermission = (requiredPermissions = []) => {
    const userPermissions = useSelector((state) => state.permissions.value);

    if (!userPermissions || userPermissions.length === 0) return false;

    const hasPermission = requiredPermissions.some(required =>
        userPermissions.some(userPerm => userPerm.route === required)
    );

    return hasPermission;
};

export default userHavePermission;
