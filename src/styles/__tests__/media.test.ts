import { css } from 'styled-components/macro';
import { media, sizes } from '../media';

describe('media', () => {
  it('should return media query in css', () => {
    const mediaQuery = media.small`color: red;`.join('');
    const cssVersion = css`@media (min-width:600px){color: red;}`.join('');
    expect(mediaQuery.toString()).toEqual(cssVersion.toString());
  });
});
