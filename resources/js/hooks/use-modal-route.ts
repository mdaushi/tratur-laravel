import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';

export function useModalRoute(basePath = null) {
    const { url, props } = usePage<SharedData>();

    // Tentukan base path kalau tidak diberikan
    const computedBasePath = basePath || getBasePath(url);

    const close = () => {
        router.visit(computedBasePath, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    return {
        modal: props.modal,
        modalEditData: props.modalEditData,
        close,
    };
}
// Helper: ambil base path dari URL sekarang (tanpa query string)
function getBasePath(url: string) {
    const path = url.split('?')[0]; // hapus query string
    const segments = path.split('/').filter(Boolean); // hapus slash kosong
    if (segments.length <= 1) return '/' + segments[0] || '/';
    return '/' + segments.slice(0, -1).join('/');
}
