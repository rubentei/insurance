// obtain Year difference
export function obtainYearDifference( year ) {
    return new Date().getFullYear() - year;
}

// calculate total depending on the brand
export function calculateByBrand( brand ) {
    let increment;

    switch(brand) {
        case 'europeo':
            increment = 1.30;
            break;

        case 'americano':
            increment = 1.15;
            break;

        case 'asiatico':
            increment = 1.05;
            break;

        default:
            break;
    }

    return increment;
}

// Calculate Insurance plan
export function obtainPlan( plan ) {
    return (plan === 'basico') ? 1.20 : 1.50;
}

// Show capital letter
export function capital( text ) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}