/**
 * @overview Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.8/introduction}
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MessageModalComponent } from './message-modal';

xdescribe('Home', function() {
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [MessageModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('contains spec that returns true', function() {
    expect(true).toBe(true);
  });
});
