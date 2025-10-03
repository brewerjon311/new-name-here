import { html, fixture, expect } from '@open-wc/testing';
import "../new-name-here.js";

describe("NewNameHere test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <new-name-here
        title="title"
      ></new-name-here>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
