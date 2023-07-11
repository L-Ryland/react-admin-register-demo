import { useCallback } from "react";
import { removeDoubleSlashes, useAuthProvider, useBasename, useNotificationContext, useNotify } from "react-admin";
import { useLocation, useNavigate } from 'react-router-dom';

export const defaultAuthParams = {
    registerUrl: '/login',
    afterRegisterUrl: '/',
};
type Register = (params: any, pathName?: string) => Promise<any>;
export const useRegister = (): Register => {
    const authProvider = useAuthProvider();
    const location = useLocation();
    const locationState = location.state as any;
    const navigate = useNavigate();
    const basename = useBasename();
    const { resetNotifications } = useNotificationContext();
    const notify = useNotify();
    const nextPathName = locationState && locationState.nextPathname;
    const nextSearch = locationState && locationState.nextSearch;
    const afterRegisterUrl = removeDoubleSlashes(
        `${basename}/${defaultAuthParams.afterRegisterUrl}`
    );

    const register = useCallback(
        (params: any = {}, pathName: string) =>
            authProvider.register(params).then(ret => {
                resetNotifications();
                if (ret && "redirectTo" in ret) {
                    if (ret) {
                        navigate(ret.redirectTo);
                    }
                } else {
                    const redirectUrl = pathName
                        ? pathName
                        : nextPathName + nextSearch || afterRegisterUrl;
                    navigate(redirectUrl);
                }
                return ret;
            }).catch(error => {
              notify(error.body.message, { type: 'error' })
            }),
        [
            authProvider,
            navigate,
            nextPathName,
            nextSearch,
            resetNotifications,
            afterRegisterUrl,
            notify
        ]
    );

    const registerWithoutProvider = useCallback(
        (_, __) => {
            resetNotifications();
            navigate(afterRegisterUrl);
            return Promise.resolve();
        },
        [navigate, resetNotifications, afterRegisterUrl]
    );

    return authProvider ? register : registerWithoutProvider;
};