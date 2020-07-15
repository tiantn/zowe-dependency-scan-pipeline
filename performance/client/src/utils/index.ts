/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import PerformanceTestException from "../exceptions/performance-test-exception";

/**
 * Sleep for certain time
 * @param {Integer} ms 
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Prepare Basic Authorization Header
 *
 * @param user        username
 * @param password    password
 */
export const getBasicAuthorizationHeader = (user?: string, password?: string): string => {
  if (!user) {
    user = process.env.TEST_AUTH_USER;
  }
  if (!password) {
    password = process.env.TEST_AUTH_PASSWORD;
  }
  if (user && password) {
    // use basic authentication
    const userPassBase64: string = Buffer.from(`${user}:${password}`).toString("base64");
    return `Authorization: Basic ${userPassBase64}`;
  } else {
    throw new PerformanceTestException("Authentication is required for this test");
  }
};