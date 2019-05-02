import { TestBed } from '@angular/core/testing';

import { ChatGuardService } from './chat-guard.service';

describe('ChatGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGuardService = TestBed.get(ChatGuardService);
    expect(service).toBeTruthy();
  });
});
