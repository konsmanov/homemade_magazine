/** @format */
const frame = document.querySelector('.center__toolbar');
const leftPanel = document.querySelector('.left__toolbar');

const starRating = (rating) => {
  let reit = rating;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= 1) {
      stars += `<img src="./img/ico/star_full.svg" alt="stars" width="16px" height="16px">`;
      rating -= 1;
    } else if (rating % 1) {
      rating = Math.floor(rating);
      stars += `<img src="./img/ico/star_half_full.svg" alt="stars" width="16px" height="16px">`;
    } else if (rating < 1) {
      stars += `<img src="./img/ico/star_empty.svg" alt="stars" width="16px" height="16px">`;
    }
  }
  stars += `<p class="p__reiting">${reit}</p>`;
  return stars;
};
const renderProducts = (base) => {
  let img = '';
  base.forEach((value) => {
    starRating(3);
    img += `<div class="product">
            <div class="img__container">
                <img src="./img/washingMachine/${value.photo}.jpg" alt="Картинка" width="254px" height="254px">
                <h2 class="category">${value.category}</h2>
                <h2 class="manufacturer">${value.manufacturer} ${value.model}</h2>   
                <div class="raiting">${starRating(value.rating)}</div>
            <div class="price">${value.price}</div>
                <button class="buy">
                    <img src="./img/ico/icons8-add-to-basket-48.png" alt="add to cart" width="26px" height="26px"></button>
            </div>
        </div> `;
  });
  frame.insertAdjacentHTML('afterbegin', img);
};

const getAttributes = (base) => {
  let out = {};
  let attributes = {};
  base.forEach((item) => {
    let set = new Set();
    for (const [key, value] of Object.entries(item)) {
      let arr = [];
      if (attributes[`${key}`] === undefined) {
        attributes[`${key}`] = [];
        if (Array.isArray(value)) {
          attributes[`${key}`].push(...value);
        } else {
          attributes[`${key}`].push(value);
        }
      } else {
        if (Array.isArray(value)) {
          attributes[`${key}`].push(...value);
        } else {
          attributes[`${key}`].push(value);
        }
      }
    }
    if (base.length === attributes.model.length) {
      for (const [key, value] of Object.entries(attributes)) {
        const uniqueSet = new Set(value);
        out[`${key}`] = [...uniqueSet].sort((a, b) => a - b);
      }
    }
  });
  return out;
};

const fnCreateCheckBox = (clas, name, conteim) => {
  return `<div class="${clas}"><input type="checkbox" name="${name}" ><p>${conteim}</p></div>`;
};

const fnGetCategory = (key) => {
  switch (key) {
    case 'category':
      return 'Категория';
    case 'manufacturer':
      return 'Бренд';
    case 'model':
      return 'Модель';
    case 'features':
      return 'Особенности';
    case 'type':
      return 'Тип';
    case 'steamTreatment':
      return 'Обратока паром';
    case 'motorType':
      return 'Тип двигателя';
    case 'width':
      return 'Ширина';
    case 'depth':
      return 'Глубина';
    case 'height':
      return 'Высота';
    case 'typeOfUpload':
      return 'Тип загрузки';
    case 'color':
      return 'Цвет';
    case 'displayAvailability':
      return 'Дисплей';
    case 'spinSpeed':
      return 'Макс Скороть отжима';
    case 'maximumLoad':
      return 'Макс загрузка';
    case 'rating':
      return 'Рейтинг';
    case 'price':
      return 'Цена';
    default:
      return 'Категория';
  }
};
const fnGetPriceList = (value) => {
  return `<option>${value}</option>`
}

const fnGenAtr = (atr) => {
  let keys = Object.keys(atr);
  keys.forEach((key) => {
    let out = '';
    if (key !== 'photo' && key !== 'price') {
      if (atr[key].length < 2) {
        out += `<div class="sort_category item__adjustment">
<h2 class="sort_type">${fnGetCategory(key)}</h2>${fnCreateCheckBox('category_item', atr[key], atr[key])}`;
      }
      if (atr[key].length > 1) {
        out += `<div class="sort_category item__adjustment"><h2 class="sort_type">${fnGetCategory(key)}</h2>`;
        atr[key].forEach((item) => {
          out += `${fnCreateCheckBox('category_item', 'category_item', item)}`;
        });
      }
      out += `</div></div>`;
      leftPanel.insertAdjacentHTML('beforeend', out);
    }
    if (key === 'price') {
      let minCase = atr[key][0];
      let maxCase = atr[key][atr[key].length-1];
      console.log(maxCase);
      out += `<div class="sort_category item__adjustment">
            <h2 class="sort_type">${fnGetCategory(key)}</h2>
            <input type="range" name="${name}" id="price" min="${minCase}" max="${maxCase}" list="steplist" class="price">
            <datalist id="steplist">`
      atr[key].forEach(price => {
        out += fnGetPriceList(price)
      })
out += `</datalist> <p>Цена </p></div>`;
      leftPanel.insertAdjacentHTML('beforeend', out);
    }
  });
};

renderProducts(base);
//console.log(getAttributes(base));
fnGenAtr(getAttributes(base));
//console.log(fnCreateCheckBox('category_item',"category_item",`${atr[key]}`));
const fnClick = () => {
  console.log(event.target);
}
leftPanel.addEventListener("click", fnClick);