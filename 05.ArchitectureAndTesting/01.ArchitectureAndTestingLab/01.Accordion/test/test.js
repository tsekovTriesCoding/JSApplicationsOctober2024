import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

let browser, page; // Declare reusable variables
describe('E2E tests', async function () {
    this.timeout(8000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });

    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads title', async () => {
        await page.goto('http://localhost:5500');

        const content = await page.$$eval('div.head span', item => item.map(i => i.textContent));

        expect(content.join(', ')).to.equal('Scalable Vector Graphics, Open standard, Unix, ALGOL');
    });

    it('more button functionality', async () => {
        await page.goto('http://localhost:5500');

        await page.click('text=more');

        const isVisible = await page.isVisible('.accordion .extra');
        const buttonText = await page.textContent('text=less');

        expect(isVisible).to.be.true;
        expect(buttonText).to.be.equal('Less');
    });

    it('less button functionality', async () => {
        await page.goto('http://localhost:5500');

        await page.click('text=more');
        await page.click('text=less');

        const isVisible = await page.isVisible('.accordion .extra');
        const buttonText = await page.textContent('text=more');

        expect(isVisible).to.be.false;
        expect(buttonText).to.be.equal('More');
    });
});