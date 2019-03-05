export default (element) => `<article class="trip-point">
                                <i class="trip-icon">${element.icon}</i>
                                <h3 class="trip-point__title">${element.title}</h3>
                                <p class="trip-point__schedule">
                                    <span class="trip-point__timetable">${element.start}&nbsp;&mdash; ${element.end}</span>
                                    <span class="trip-point__duration">${element.hours}</span>
                                </p>
                                <p class="trip-point__price">&euro;&nbsp;${element.price}</p>
                                <ul class="trip-point__offers">
                                    <li>
                                        <button class="trip-point__offer">Order UBER +&euro;&nbsp;20</button>
                                    </li>
                                    <li>
                                        <button class="trip-point__offer">Upgrade to business +&euro;&nbsp;20</button>
                                    </li>
                                </ul>
                            </article>`;
