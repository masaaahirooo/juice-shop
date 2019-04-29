import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'

import { DataSubjectService } from './data-subject.service'

describe('DataSubjectService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataSubjectService]
    })
  })

  it('should be created', inject([DataSubjectService], (service: DataSubjectService) => {
    expect(service).toBeTruthy()
  }))

  it('should delete the user profile of a logged in user', inject([DataSubjectService, HttpTestingController],
    fakeAsync((service: DataSubjectService, httpMock: HttpTestingController) => {
      let res
      service.deactivate().subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/rest/data-subject')
      req.flush('apiResponse')

      tick()
      expect(req.request.method).toBe('GET')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})
