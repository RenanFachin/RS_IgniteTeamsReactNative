export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // undefined => nenhum parâmetro
      groups: undefined;
      new: undefined;
      players: {
        // parâmetros passados pela rota
        group: string;
      };
    }
  }
}