from abc import ABC, abstractmethod
from typing import Any


class UseCase(ABC):
    """Interface base para casos de uso."""

    @abstractmethod
    def execute(self, *args: Any, **kwargs: Any) -> Any:
        """Processa a operação do caso de uso."""
        raise NotImplementedError
