import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const paciente of value){
      if(paciente.curpPaciente.toLowerCase().indexOf(arg.toLowerCase()) > -1 || paciente.nombrePaciente.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(paciente);
      };
    };
    return resultPosts;
  }

}
