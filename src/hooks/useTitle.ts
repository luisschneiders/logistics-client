import { useEffect } from 'react';

export const useTitle = (title?: string, overrideDefaultTitle?: boolean) => {
    const defaultTitle = 'Logistics App';
    useEffect(() => {
        if (!title) {
            document.title = defaultTitle;
        } else {
            document.title = overrideDefaultTitle ? title : `${defaultTitle} - ${title}`;
        }
    });
};
