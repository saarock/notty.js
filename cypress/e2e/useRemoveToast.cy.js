import { NOTTY_ANIMATE_FADE_IN_CLASS, NOTTY_ANIMATE_FADE_OUT_CLASS } from '../../src/constant';
import useRemoveToast from '../../dist/hooks/useRemoveToast';

describe('useRemoveToast', () => {
  beforeEach(() => {
    // Set up the DOM element
    document.body.innerHTML = `
      <div id="toastBox" class="${NOTTY_ANIMATE_FADE_IN_CLASS}__LEFT" style="animation-play-state: running;">
        Toast Content
      </div>
    `;
  });

  it('should remove the toastBox element after the fade out animation', (done) => {
    const toastBox = document.getElementById('toastBox');
    useRemoveToast(toastBox);

    expect(toastBox.classList.contains(`${NOTTY_ANIMATE_FADE_OUT_CLASS}__RIGHT`)).to.be.true;

    setTimeout(() => {
      console.log('Checking if toastBox is null:', document.getElementById('toastBox'));
      expect(document.getElementById('toastBox')).to.be.null;
      done();
    }, 600); // 500ms animation duration + 100ms buffer
  });

  it('should not remove the toastBox if the animation is paused', () => {
    const toastBox = document.getElementById('toastBox');
    toastBox.style.animationPlayState = 'paused';
    useRemoveToast(toastBox);

    // Check if the element is not removed immediately
    expect(document.getElementById('toastBox')).to.not.be.null;
  });

  it('should remove the toastBox element immediately if no animation is set', (done) => {
    const toastBox = document.getElementById('toastBox');
    toastBox.style.animationPlayState = '';
    useRemoveToast(toastBox);

    setTimeout(() => {
      console.log('Checking if toastBox is null immediately:', document.getElementById('toastBox'));
      expect(document.getElementById('toastBox')).to.be.null;
      done();
    }, 500); // Short duration for immediate removal check
  });
});
