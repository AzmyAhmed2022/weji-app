
export interface iNavBarData {
    serial?: number,
    routerLink: string,
    icon: string,
    label: string

}
export interface sideNavToggle {
    screenWidth: number;
    collapsed: boolean;

}
export const navBarData = [
    {
        serial: 1,
        routerLink: "dashboard",
        icon: 'bx bxs-dashboard',
        label: 'لوحة التحكم'

    },
    {
        serial: 2,
        routerLink: "home-needs",
        icon: 'bx bxs-cart-add',
        label: 'احتياجات منزلية'

    },
    {
        serial: 3,
        routerLink: "transportation",
        icon: 'bx bxs-car',
        label: 'مواصلات'

    },
    {
        serial: 4,
        routerLink: "shipping-items",
        icon: 'bx bxs-paper-plane',
        label: 'شحن اغراض'

    },
    {
        serial: 5,
        routerLink: "financial-dealings",
        icon: 'bx bxs-dollar-circle',
        label: 'تعاملات مالية'

    },
    {
        serial: 6,
        routerLink: "personal-occasions",
        icon: 'bx bxs-gift',
        label: 'مناسبات شخصية'

    },
    {
        serial: 7,
        routerLink: "reservations",
        icon: 'bx bxs-business',
        label: 'حجوزات'

    },
    {
        serial: 8,
        routerLink: "software",
        icon: 'bx bxs-devices',
        label: 'الكترونيات'

    },
    {
        serial: 9,
        routerLink: "products",
        icon: 'bx bxs-store',
        label: 'منتجات وي جي'

    },
    {
        serial: 10,
        routerLink: "user-request",
        icon: 'bx bxs-plus-circle',
        label: 'حدد عايز اي'

    }

]

