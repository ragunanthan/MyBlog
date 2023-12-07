import { headers } from 'next/headers';


export function getPathName() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');    
    return pathname;
}
