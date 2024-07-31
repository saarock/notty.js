import { notty } from '../../src/NotificationToastManager';
import { nottyManager } from '../../dist/services/NotificationToastManager';
import { Queue } from '../../dist/models/Queue';

describe('NotificationToastManager', () => {
  beforeEach(() => {
    // Reset the queue before each test
    nottyManager.queue = new Queue(2);
    // Set up the DOM element
    document.body.innerHTML = `
      <div id="notty__container"></div>
    `;
  });

  it('should add a success toast to the queue and show it', (done) => {
    const toast = {
      message: "Success Toast",
      timeOut: 1000,
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    notty.success(toast).then(() => {
      const nottyContainer = document.getElementById('notty__container');
      const toastBox = nottyContainer.querySelector('.notty__toast');

      expect(toastBox).to.exist;
      expect(toastBox.querySelector('.notty__message').textContent).to.equal("Success Toast");

      setTimeout(() => {
        expect(nottyContainer.querySelector('.notty__toast')).to.be.null;
        done();
      }, 1500); // 1000ms timeout + 500ms buffer
    });
  });

  it('should add an error toast to the queue and show it', (done) => {
    const toast = {
      message: "Error Toast",
      timeOut: 1000,
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    notty.error(toast).then(() => {
      const nottyContainer = document.getElementById('notty__container');
      const toastBox = nottyContainer.querySelector('.notty__toast');

      expect(toastBox).to.exist;
      expect(toastBox.querySelector('.notty__message').textContent).to.equal("Error Toast");

      setTimeout(() => {
        expect(nottyContainer.querySelector('.notty__toast')).to.be.null;
        done();
      }, 1500); // 1000ms timeout + 500ms buffer
    });
  });

  it('should add a loading toast to the queue and show it', (done) => {
    const toast = {
      message: "Loading Toast",
      timeOut: 1000,
      toastIconClassName: "icon-class",
      toastMessageClassName: "message-class",
      RemoveIconClassName: "remove-icon-class",
      position: "LEFT",
      comeFrom: "LEFT"
    };

    notty.loading(toast).then(() => {
      const nottyContainer = document.getElementById('notty__container');
      const toastBox = nottyContainer.querySelector('.notty__toast');

      expect(toastBox).to.exist;
      expect(toastBox.querySelector('.notty__message').textContent).to.equal("Loading Toast");

      setTimeout(() => {
        expect(nottyContainer.querySelector('.notty__toast')).to.be.null;
        done();
      }, 1500); // 1000ms timeout + 500ms buffer
    });
  });
});
