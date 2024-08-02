import { NOTTY_CONTAINER_ID_NAME, NOTTY_CROSS_ICON_CLASS, NOTTY_TOAST_CLASS } from '../../src/constant.js';
import useAddEventListenerOnTheCutIcon from '../../dist/hooks/useAddEventListenerOnTheCutIcon.js';

describe('useAddEventListenerOnTheCutIcon', () => {

  beforeEach(() => {
    // Set up the DOM element
    document.body.innerHTML = `
      <div id="${NOTTY_CONTAINER_ID_NAME}">
        <div class="${NOTTY_TOAST_CLASS}">
          <span class="${NOTTY_CROSS_ICON_CLASS}">X</span>
        </div>
      </div>
    `;
  });

  it('should throw an error if NOTTY_CONTAINER_ID_NAME element is missing', () => {
    document.getElementById(NOTTY_CONTAINER_ID_NAME).remove();
    expect(() => useAddEventListenerOnTheCutIcon()).to.throw('notty__container required');
  });

  it('should remove the toast element when the cross icon is clicked', (done) => {
    useAddEventListenerOnTheCutIcon();
    const crossIcon = document.querySelector(`.${NOTTY_CROSS_ICON_CLASS}`);
    const toast = document.querySelector(`.${NOTTY_TOAST_CLASS}`);

    // Simulate click on cross icon
    crossIcon.click();

    // Check if the toast element is removed after the animation
    setTimeout(() => {
      expect(document.querySelector(`.${NOTTY_TOAST_CLASS}`)).to.be.null;
      done();
    }, 600);
  });
});
