export default (element) => `<input type="radio" id="filter-${element.name}" name="filter" value="${element.name}" ${element.check ? "checked" : " "}>
                             <label class="trip-filter__item" for="filter-${element.name}">${element.name}</label>`;
