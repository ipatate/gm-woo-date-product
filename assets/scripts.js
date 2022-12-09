/** days open */
const days = ['dimanche', 'mercredi', 'jeudi', 'vendredi', 'samedi']

/** add day to date */
const addDays = (date, days) => {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

/**
 * get date for timezone
 * @param {string} offset
 */
const getTime = (offset, date) => {
  const d = date || new Date()
  const utc = d.getTime() + d.getTimezoneOffset() * 60000
  const nd = new Date(utc + 3600000 * offset)
  return nd
}

// get list of collect days
const getCollectDays = (day) => {
  if (day === 0) {
    return []
  }
  const d = [...days]
  d.splice(0, day + 1)
  return d
}
// display mode for date
const options = {
  weekday: 'long',
  // year: 'numeric',
  month: 'long',
  day: 'numeric',
}

/**
 * get numbers of days from date to date
 *
 * @param {Date} date
 * @param {string} stringDate
 * @returns
 */
const getDaysToDate = (date, stringDate) => {
  // number of day for attempt 30 december
  const endofdecember = new Date(stringDate)
  const difference = endofdecember.getTime() - date.getTime()
  return Math.ceil(difference / (1000 * 3600 * 24))
}

const getCollecteDate = (date) => {
  const end = getDaysToDate(date, '12/31/2022')

  const r = []
  for (let i = 2; i <= end; i++) {
    const t = addDays(date, i)
    const simplifiedDate = t.toLocaleDateString('fr-FR', {
      month: 'numeric',
      day: 'numeric',
    })
    if (t.getDay() !== 1 && t.getDay() !== 2 && simplifiedDate !== '25/12') {
      r.push(t.toLocaleDateString('fr-FR', options))
    }
  }

  return r
}

const createOption = (value, selected, setValue = true) => {
  const option = document.createElement('option')
  if (setValue) {
    option.value = value
  }
  option.innerText = value
  if (value === selected) {
    option.selected = true
  }
  return option
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('gm-woo-date-product-wrapper')
  if (wrapper) {
    const bt = document.querySelector('.single_add_to_cart_button')
    if (bt) {
      bt.setAttribute('disabled', 'true')
    }
    const { value, label, placeholder } = wrapper.dataset
    const d = getTime('+1')
    const cd = getCollecteDate(d)
    const labelTag = document.createElement('label')
    labelTag.innerText = label
    labelTag.setAttribute('for', 'gm-date-selector')
    const select = document.createElement('select')
    select.id = 'gm-date-selector'
    select.name = 'gm-date-selector'
    // first empty
    select.appendChild(createOption(placeholder, null, false))

    cd.forEach((dt) => {
      select.appendChild(createOption(dt, value))
    })
    wrapper.appendChild(labelTag)
    wrapper.appendChild(select)

    select.addEventListener('change', () => {
      if (select.value !== '') {
        bt.removeAttribute('disabled')
      } else {
        bt.setAttribute('disabled', 'true')
      }
    })
  }
})
