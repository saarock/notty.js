import { NOTTY_CONTAINER_ID_NAME, NOTTY_CROSS_ICON_CLASS, NOTTY_TOAST_CLASS } from '../../src/constant';
import { nottyManager } from '../../dist/services/NotificationManager';
import { Queue } from '../../dist/models/Queue';

describe('NotificationManager', () => {
  beforeEach(() => {
    // Set up the DOM element
    document.body.innerHTML = `
      <div id="${NOTTY_CONTAINER_ID_NAME}"></div>
    `;
    nottyManager.queue = new Queue(2); // Reset the queue before each test
  });

  it('should initialize with an empty queue', () => {
    expect(nottyManager.queue.isEmpty()).to.be.true;
  });

  it('should add a toast to the queue and show it', (done) => {
    const toast = {
      message: "Test Toast",
      timeOut: 1000,
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    nottyManager.addToastToQueue(toast, "info").then(() => {
      const nottyContainer = document.getElementById(NOTTY_CONTAINER_ID_NAME);
      const toastBox = nottyContainer.querySelector(`.${NOTTY_TOAST_CLASS}`);

      expect(toastBox).to.exist;
      expect(toastBox.querySelector(`.${NOTTY_CROSS_ICON_CLASS}`)).to.exist;
      expect(toastBox.querySelector(`.notty__info__message`).textContent).to.equal("Test Toast");

      setTimeout(() => {
        expect(nottyContainer.querySelector(`.${NOTTY_TOAST_CLASS}`)).to.be.null;
        done();
      }, 1500); // 1000ms timeout + 500ms buffer
    });
  });

  it('should handle mouseenter and mouseleave events on toast', (done) => {
    const toast = {
      message: "Test Toast",
      timeOut: 1000,
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    nottyManager.addToastToQueue(toast, "info").then(() => {
      const toastBox = document.querySelector(`.${NOTTY_TOAST_CLASS}`);
      
      // Simulate mouseenter event
      toastBox.dispatchEvent(new Event('mouseenter'));
      expect(toastBox.style.animationPlayState).to.equal('paused');

      // Simulate mouseleave event
      toastBox.dispatchEvent(new Event('mouseleave'));
      expect(toastBox.style.animationPlayState).to.equal('running');

      setTimeout(() => {
        expect(document.querySelector(`.${NOTTY_TOAST_CLASS}`)).to.be.null;
        done();
      }, 1500); // 1000ms timeout + 500ms buffer
    });
  });

  it('should remove toast on click of the cut icon', (done) => {
    const toast = {
      message: "Test Toast",
      timeOut: 10000, 
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    nottyManager.addToastToQueue(toast, "info").then(() => {
      const toastBox = document.querySelector(`.${NOTTY_TOAST_CLASS}`);
      const cutIcon = toastBox.querySelector(`.${NOTTY_CROSS_ICON_CLASS}`);
      
      
      cutIcon.click();

      setTimeout(() => {
        expect(document.querySelector(`.${NOTTY_TOAST_CLASS}`)).to.be.null;
        done();
      }, 600); // 500ms animation duration + 100ms buffer
    });
  });

  it('should initialize event for toast removal by click', () => {
    cy.spy(console, 'error').as('consoleError');

    nottyManager.initializeEventForToastRemovalByClick();

    cy.get('@consoleError').should('not.have.been.called');
  });
});
