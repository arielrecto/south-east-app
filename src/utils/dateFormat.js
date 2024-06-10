import moment from "moment"

export const timeStamp  = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

export const Month = (date) => {
    return moment(date).format('MMMM');
}

export const timeFormat = (time) => {

    return moment(time, "HH:mm").format('LT');
}