import { Hono } from 'hono'
import { describe, expect, it } from "vitest"
import { testClient } from "hono/testing"
import app from "../src/index";

describe('Search Endpoint', () => {
	// Create the test client from the app instance
	const client = testClient(app)

	it('should return search results', async () => {
		// Call the endpoint using the typed client
		// Notice the type safety for query parameters (if defined in the route)
		// and the direct access via .$get()
		const res = await client.search.$get({
			query: { q: 'hono' },
		})

		// Assertions
		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			query: 'hono',
			results: ['result1', 'result2'],
		})
	})
})
