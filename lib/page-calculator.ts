export const pageDataCalculator = (page: number, per_page: number, total: number) => {
    if (total>per_page) {
        return  {
            "firstIndex":(page * per_page) - (per_page),
            "lastIndex":page*per_page> total ? total : page*per_page
        }
    } else {
        return  {
            "firstIndex":total,
            "lastIndex":total
        }
    }
}