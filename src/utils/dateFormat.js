import moment from "moment"

export const timeStamp  = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

export const Month = (date) => {
    return moment(date).format('MMMM');
}