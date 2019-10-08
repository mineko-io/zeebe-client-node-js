import { ZBClient } from '../..'

jest.setTimeout(10000)
process.env.ZEEBE_NODE_LOG_LEVEL = process.env.ZEEBE_NODE_LOG_LEVEL || 'NONE'

describe('onReady Handler', () => {
	it(`Doesn't call the onReady handler if there is no broker`, async done => {
		let called = false
		const zbc2 = new ZBClient('localtoast: 267890', {
			onReady: () => {
				called = true
			},
		}) // Doesn't exist!!!
		setTimeout(() => {
			expect(called).toBe(false)
			expect(zbc2.connected).toBe(false)
			zbc2.close()
			done()
		}, 4000)
	})

	it(`Does call the onReady handler if there is a broker`, done => {
		let called = 0
		const zbc2 = new ZBClient({
			onReady: () => {
				called++
			},
		})

		setTimeout(() => {
			expect(called).toBe(1)
			expect(zbc2.connected).toBe(true)
			zbc2.close()
			done()
		}, 4000)
	})
})
