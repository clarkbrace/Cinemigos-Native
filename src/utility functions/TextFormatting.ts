export const minutesToHrMin = (totalMinutes: number | undefined): string => {

    if (totalMinutes === undefined) { 
        return "unknown runtime"
    }
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes - (hours * 60)

    if (hours === 0 && minutes === 0) { 
        return "unknown runtime"
    }
    
    if (hours < 1) { 
        return `m${minutes}`
    }

    if (minutes === 0) { 
        return `h${hours}`
    }

    return `${hours}h m${minutes}`
}
 
// Example date: 2007-10-28 -> October 10th 2007
export const formatData = (unformattedDate: string): string => { 

    const dateComponents = unformattedDate.split('-')

    const dayNumber = Number(dateComponents[2])

    // Get day 
    let ordinalIndicator = ""
    if ([1, 21, 21].includes(dayNumber)) {
        ordinalIndicator = "st"
    } else if ([2, 22, 32].includes(dayNumber)) {
        ordinalIndicator = "nd"
    } else if ([3, 23].includes(dayNumber)) {
        ordinalIndicator = "rd"
    } else { 
        ordinalIndicator = "th"
    }
    
    return `${monthMap.get(dateComponents[1])} ${dayNumber}${ordinalIndicator} ${dateComponents[0]}`
}

const monthMap: Map<string, string> = new Map([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"]
  ]);