export class JsonWriter {
  public send(fileToRead: string): void {
    ;(window as any).api.send('READ_FILE', fileToRead)
  }

  public request(): string {
    return (window as any).api.receive('READ_FILE', (data: string) => { 
      console.log(data)
      return data 
    })
  }
}
